# workflow.py
"""
Simple workflow manager for multi-step processes in the app.
"""

class Workflow:
    def __init__(self, steps: list[str]):
        self.steps = steps
        self.current = 0

    def next_step(self) -> str:
        """Move to the next step and return its name."""
        if self.current < len(self.steps) - 1:
            self.current += 1
        return self.steps[self.current]

    def reset(self):
        """Reset workflow to the beginning."""
        self.current = 0

    def is_complete(self) -> bool:
        """Check if the workflow has finished."""
        return self.current == len(self.steps) - 1


# Example usage:
if __name__ == "__main__":
    signup_flow = Workflow(["Enter Email", "Verify OTP", "Create Password", "Complete"])
    print(signup_flow.next_step())  # Verify OTP
