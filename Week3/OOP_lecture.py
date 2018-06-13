class Person():

    # ALL "INSTANCE" METHODS
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f"{self.first_name} {self.last_name}"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def is_person(cls, val):
        return isinstance(val, cls)


class Card():
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.suit} {self.value}"


class Deck():
    def __init__(self):

        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = [
            'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
        ]

        # Using list comprehension
        self.cards = [Card(suit, value) for suit in suits for value in values]

        # Not using list comprehension
        self.cards = []

        for suit in suits:
            for val in values:
                self.cards.append(Card(suit, val))

    def __repr__(self):
        return f"You have {len(self.cards)} cards left"


first_deck = Deck()