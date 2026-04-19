# Passphrase Manager

A secure Chrome extension that acts as a lightweight password manager with encrypted local storage and a built-in passphrase generator.

## Features

- Encrypted password vault using AES-GCM
- Master password protection
- Store and retrieve credentials per website
- Autofill login forms
- Built-in passphrase generator
- Works fully offline

## How It Works

- All passwords are encrypted locally before being stored
- Your master password is never saved
- Decryption only happens in memory when unlocked

## Usage

1. Enter master password and unlock
2. Add site, username, and password
3. Save credentials securely
4. Load or autofill anytime

## Security

- AES-256 encryption via Web Crypto API
- PBKDF2 key derivation
- No external servers
- No tracking

## Installation

1. Go to chrome://extensions/
2. Enable Developer Mode
3. Load unpacked extension folder

## Warning

If you forget your master password, your data cannot be recovered.
