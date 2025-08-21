from flask import Flask, render_template, request
from auto_focus import set_focus

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def form_page():
    message = ""
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = f"Received: {name} ({email})"
    return render_template("form.html", focus=set_focus("name"), message=message)


if __name__ == "__main__":
    app.run(debug=True)
