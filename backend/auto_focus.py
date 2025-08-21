from flask import Markup

def set_focus(field_id: str) -> str:
    """Return JavaScript snippet to auto-focus on a given input field."""
    return Markup(f"<script>document.getElementById('{field_id}').focus();</script>")
