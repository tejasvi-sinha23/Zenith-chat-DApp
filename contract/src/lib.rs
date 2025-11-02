#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, panic_with_error,
    Address, Bytes, Env, Vec, String,
};

#[contracttype]
pub enum DataKey {
    Friends(Address),
    History(Bytes),
}

#[contracttype]
#[derive(Clone)]
pub struct Message {
    pub sender: Address,
    pub timestamp: i128,
    pub ciphertext: Bytes,
}

#[contracttype]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum ChatError {
    DuplicateFriend = 1,
    MessageEmpty = 2,
}

impl From<ChatError> for soroban_sdk::Error {
    fn from(err: ChatError) -> Self {
        soroban_sdk::Error::from_contract_error((err as u32).into())
    }
}

#[contract]
pub struct ZenithChat;

#[contractimpl]
impl ZenithChat {
    /// Generate a canonical chat ID (order-independent)
    fn get_canonical_chat_id(env: &Env, user_a: Address, user_b: Address) -> Bytes {
        // Convert addresses to Soroban Strings
        let str_a: String = user_a.to_string();
        let str_b: String = user_b.to_string();

        // Sort lexicographically
        let (first, second) = if str_a < str_b { (str_a, str_b) } else { (str_b, str_a) };

        // Convert Soroban Strings to Bytes
        let bytes_a = first.to_bytes();
        let bytes_b = second.to_bytes();

        // Create separator
        let sep = Bytes::from_slice(env, b"|");

        // Combine all parts
        let mut combined = bytes_a.clone();
        combined.append(&sep);
        combined.append(&bytes_b);

        combined
    }

    /// Add a friend to the list (auth required)
    pub fn add_friend(env: Env, owner: Address, friend: Address) {
        owner.require_auth();

        let key = DataKey::Friends(owner.clone());
        let store = env.storage().persistent();

        let mut list: Vec<Address> = store.get(&key).unwrap_or(Vec::new(&env));

        if list.contains(&friend) {
            panic_with_error!(&env, ChatError::DuplicateFriend);
        }

        list.push_back(friend.clone());
        store.set(&key, &list);

        store.extend_ttl(&key, 60 * 24 * 3600, 60 * 24 * 3600);
    }

    /// Get all friends for an account
    pub fn get_friends(env: Env, owner: Address) -> Vec<Address> {
        let key = DataKey::Friends(owner);
        env.storage().persistent().get(&key).unwrap_or(Vec::new(&env))
    }

    /// Push a new encrypted message
    pub fn push_message(env: Env, sender: Address, recipient: Address, timestamp: i128, ciphertext: Bytes) {
        sender.require_auth();

        if ciphertext.is_empty() {
            panic_with_error!(&env, ChatError::MessageEmpty);
        }

        let chat_id = Self::get_canonical_chat_id(&env, sender.clone(), recipient);
        let key = DataKey::History(chat_id);
        let store = env.storage().persistent();

        let mut history: Vec<Message> = store.get(&key).unwrap_or(Vec::new(&env));

        let msg = Message {
            sender,
            timestamp,
            ciphertext,
        };

        history.push_back(msg);
        store.set(&key, &history);

        store.extend_ttl(&key, 7 * 24 * 3600, 7 * 24 * 3600);
    }

    /// Retrieve the full chat history between two users
    pub fn get_messages(env: Env, user_a: Address, user_b: Address) -> Vec<Message> {
        let chat_id = Self::get_canonical_chat_id(&env, user_a, user_b);
        let key = DataKey::History(chat_id);
        env.storage().persistent().get(&key).unwrap_or(Vec::new(&env))
    }
}
