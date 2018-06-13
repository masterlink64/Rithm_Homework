class BankAccount():
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, num):
        self.balance = self.balance + num
        return self.balance

    def withdraw(self, num):
        self.balance = self.balance - num
        return self.balance


acct = BankAccount('Darcy')
acct_mario = BankAccount('Mario', 5000)