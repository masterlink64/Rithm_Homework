def calc(s):
    """ 
    this function should take in a string and calculate all the operations
    evaluate a prefix math expression
    input: string
    output: number
    
    >>> calc('+ 1 2')
    3

    >>> calc('* 3 - 5 2')
    9
     """
    # Convert to list of tokens
    #
    # For example: "+ 1 2" -> ["+", "1", "2"]
    tokens = s.split()

    # Start with right-most number (in a well-formed polish notation
    # expression, it must ALWAYS end with a number)
    operand2 = int(tokens.pop())

    while tokens:
        # Grab the right-most number
        operand1 = int(tokens.pop())

        # Grab the right-most operand
        operator = tokens.pop()

        # Do the math and use the result as our "right-hand" value
        # for the next time we do math

        if operator == "+":
            operand2 = operand1 + operand2

        elif operator == "-":
            operand2 = operand1 - operand2

        elif operator == "*":
            operand2 = operand1 * operand2

        elif operator == "/":
            operand2 = operand1 / operand2

    # The final result is the result of the most recent operation

    return operand2