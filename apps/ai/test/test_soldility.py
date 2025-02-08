from cdp import *

api_key_name = "organizations/596ec8c5-ae64-4ea9-867a-8edd0dac98c0/apiKeys/c5987df5-4211-4c0f-9592-0a38fd6dd97f"

api_key_private_key = "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEINPad506XBfzvxQo4+h04BO//atUVfhvavaQEhjf0BoVoAoGCCqGSM49\nAwEHoUQDQgAEG3oGwL13Hgis3t9KQPv9YfPZ/kxDBWZL7SMNCCRE6xZH9Vy4kLHM\nz7meyWuQyJRbDbJBpGvFiwjPYydmpyB8LA==\n-----END EC PRIVATE KEY-----\n"

Cdp.configure(api_key_name, api_key_private_key)

print("CDP SDK has been successfully configured with CDP API key.")

wallet1 = Wallet.create()

print(f"Wallet successfully created: {wallet1}")