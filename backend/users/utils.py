from django.core.mail import EmailMessage


def SendActivationEmail(data):
    token = data.get("token")
    user_id = data.get("user_id")
    firstname = data.get("firstname")
    email = data.get("email")
    email = EmailMessage("Verify Your Account",
                         f"Hi {firstname} Please Activate "
                         f"Your Acccount by visiting"
                         f"the link "
                         f"http://localhost:8000/auth"
                         f"/activate/{user_id}/{token}/",
                         "getacher.d@gmail.com", [email])
    email.send()


def SendPasswordResetEmail(data):
    token = data.get("token")
    user_id = data.get("user_id")
    firstname = data.get("firstname")
    email = data.get("email")
    email = EmailMessage("Please Reset Your Password",
                         f"\n\nHi {firstname} Please reset Your"
                         f"Password\n\nYour code is: {token} \n\n "
                         f"if you do not request "
                         f"password reset ignore this message",
                         "getacher.d@gmail.com", [email])
    email.send()
