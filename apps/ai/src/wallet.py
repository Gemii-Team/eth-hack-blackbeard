from cdp import *
from dotenv import load_dotenv
import os

# Load API Key from .env
load_dotenv()

api_key_name = os.getenv("CDP_API_KEY_NAME")
api_key_private_key = os.getenv("CDP_API_KEY_PRIVATE_KEY")

# Configure SDK
Cdp.configure(api_key_name, api_key_private_key)
print("✅ CDP SDK has been successfully configured!")

# 🔹 1. Function to create a wallet
def create_wallet():
    wallet = Wallet.create()
    print(f"✅ New wallet created: {wallet}")
    print(f"📌 Default wallet address: {wallet.default_address}")
    return wallet

# 🔹 2. Function to fund a wallet (Faucet)
def fund_wallet(wallet, token="eth"):
    faucet_tx = wallet.faucet(token)
    faucet_tx.wait()
    print(f"✅ Successfully funded {token.upper()}: {faucet_tx}")

# 🔹 3. Function to transfer funds
def transfer_funds(from_wallet, to_wallet, amount, currency="eth", gasless=False):
    transfer = from_wallet.transfer(amount, currency, to_wallet, gasless=gasless).wait()
    print(f"✅ Successfully transferred {amount} {currency.upper()}: {transfer}")

# 🔹 4. Function to list transactions
def list_transactions(wallet):
    transactions = wallet.default_address.transfers()
    print("📌 Transaction history:")
    for tx in transactions:
        print(tx)

# 🔹 5. Function to swap cryptocurrencies
def trade_crypto(wallet, amount, from_currency, to_currency):
    trade = wallet.trade(amount, from_currency, to_currency).wait()
    print(f"✅ Successfully swapped {amount} {from_currency.upper()} ➡ {to_currency.upper()}: {trade}")

# 🔹 6. Function to save and restore wallet seed
# 🔹 Save seed to file
def save_wallet_seed(wallet, file_path="wallet_seed.json"):
    wallet.save_seed_to_file(file_path, encrypt=True)  # ✅ Uses `save_seed_to_file()`
    print(f"✅ Seed has been saved to: {file_path}")

# 🔹 Load wallet seed from file
def load_wallet_seed(wallet_id, file_path="wallet_seed.json"):
    wallet = Wallet.fetch(wallet_id)  # ✅ Fetch the existing wallet
    wallet.load_seed_from_file(file_path)  # ✅ Load seed from file into the wallet
    print(f"✅ Wallet successfully restored: {wallet}")
    return wallet

# 🔹 7. Function to create a webhook
def create_webhook(wallet, callback_url):
    webhook = wallet.create_webhook(callback_url)
    print(f"✅ Webhook created: {webhook}")

# 🔹 8. Function to create an ERC20 Transfer Webhook
def create_token_webhook(callback_url, from_address, network="base-mainnet"):
    from cdp.client.models.webhook import WebhookEventType, WebhookEventFilter
    webhook = Webhook.create(
        notification_uri=callback_url,
        event_type=WebhookEventType.ERC20_TRANSFER,
        event_filters=[WebhookEventFilter(from_address=from_address)],
        network_id=network
    )
    print(f"✅ ERC20 Transfer Webhook created: {webhook}")

# ✅ 1. Create a wallet
wallet1 = create_wallet()

# ✅ 2. Fund wallet with ETH
fund_wallet(wallet1, "eth")

# ✅ 3. Create a new wallet to receive funds
wallet2 = create_wallet()

# ✅ 4. Transfer ETH from wallet1 to wallet2
transfer_funds(wallet1, wallet2, 0.00001, "eth")

# ✅ 5. List transactions
list_transactions(wallet1)

# ✅ 6. Swap ETH ➡ USDC
# trade_crypto(wallet1, 0.00001, "eth", "usdc")

# ✅ 7. Save and restore wallet seed
# ✅ Save seed
save_wallet_seed(wallet1, "wallet1_seed.json")

# ✅ Load wallet from seed
wallet_restored = load_wallet_seed(wallet1.id, "wallet1_seed.json")

# ✅ 8. Set up a webhook
# create_webhook(wallet1, "https://your-app.com/callback")
