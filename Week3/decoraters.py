def first_decorator(fn):
    def inner(*args, **kwargs):
        # DECORATE!
        print("awesome!")
        return fn(*args, **kwargs)

    return inner


@first_decorator
def say_hi():
    print("Hi!")


# OVERWROTE!
# say_hi = first_decorator(say_hi)

# say_hi()


def ensure_even_numbers(fn):
    def inner(*args, **kwargs):
        if args[0] % 2 == 0 and args[1] % 2 == 0:
            return fn(*args, **kwargs)
        else:
            print("Only evens please!")

    return inner


@first_decorator
@ensure_even_numbers
def add_only_evens(a, b):
    print(a + b)


add_only_evens(10, 201)


def once(fn):
    check = False

    def inner(*args, **kwargs):
        nonlocal check
        if not check:
            check = True
            return fn(*args, **kwargs)
        else:
            print('already ran')
        pass

    return inner


@once
def add_once(a, b):
    print(a + b)


add_once(1, 2)
add_once(5, 2)
