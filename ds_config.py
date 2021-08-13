# ds_config.py
#
# DocuSign configuration settings

DS_CONFIG = {
    "ds_client_id": "3aec3760-d7cb-449d-a44b-c0ff8ad48bce",  # The app's DocuSign integration key # e0f1a1cd-0e6a-4162-86eb-0d20b51c85fc
    "ds_client_secret": "c2c25022-bf27-4cec-9817-5ad15f999fe0",  # The app's DocuSign integration key's secret  # 6ab5ab57-bfa5-4921-b44c-75a682ea717d
    "signer_email": "low.lucyy@gmail.com",
    "signer_name": "Lucy Low",
    "app_url": "http://localhost:5000",  # The URL of the application. Eg http://localhost:5000
    # NOTE: You must add a Redirect URI of appUrl/ds/callback to your Integration Key.
    #       Example: http://localhost:5000/ds/callback
    "authorization_server": "https://account-d.docusign.com",
    "click_api_client_host": "https://demo.docusign.net/clickapi",
    "rooms_api_client_host": "https://demo.rooms.docusign.com/restapi",
    "monitor_api_client_host": "https://lens-d.docusign.net",
    "allow_silent_authentication": True,  # a user can be silently authenticated if they have an
    # active login session on another tab of the same browser
    "target_account_id": None,  # Set if you want a specific DocuSign AccountId,
    # If None, the user's default account will be used.
    "demo_doc_path": "demo_documents",
    "doc_salary_docx": "World_Wide_Corp_salary.docx",
    "doc_docx": "World_Wide_Corp_Battle_Plan_Trafalgar.docx",
    "doc_pdf": "World_Wide_Corp_lorem.pdf",
    "doc_terms_pdf": "Term_Of_Service.pdf",
    "doc_txt": "Welcome.txt",
    # Payment gateway information is optional
    "gateway_account_id": "d83f190b-291f-441c-acca-b984e369a796",
    "gateway_name": "stripe",
    "gateway_display_name": "Stripe",
    "github_example_url": "https://github.com/docusign/code-examples-python/tree/master/app/eSignature/examples/",
    "monitor_github_url": "https://github.com/docusign/code-examples-python/tree/master/app/monitor/examples/",
    "documentation": "",  # Use an empty string to indicate no documentation path.
    "quickstart": "false " # activate full launcher functionality
}

DS_JWT = {
    "ds_client_id": "3aec3760-d7cb-449d-a44b-c0ff8ad48bce",
    "ds_impersonated_user_id": "d2ebfb6e-5d95-488f-8d18-a07259436084",  # The id of the user.
    "private_key_file": "./app/private.key", # Create a new file in your repo source folder named private.key then copy and paste your RSA private key there and save it.
    "authorization_server": "account-d.docusign.com"
}

EXAMPLES_API_TYPE = {
        "Rooms": False,
        "ESignature": True,
        "Click": False,
        "Monitor": False,
}
