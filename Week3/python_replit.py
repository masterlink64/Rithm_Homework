# def running_average():
#     # use closure
#     avg = 0
#     count = 0

#     def inner(num):
#         nonlocal count, avg
#         count += 1
#         avg += num
#         print(avg / count)
#         return avg / count

#     return inner
#     pass

# rAvg = running_average()
# rAvg(10)  # 10.0
# rAvg(11)  # 10.5
# # rAvg(12) # 11.0

# def calculate(**kwargs):
#     first_value = kwargs.get('first')
#     second_value = kwargs.get('second')
#     o = kwargs.get('operation')
#     mess = kwargs.get('message') or 'The result is '
#     boat = kwargs.get('make_float')
#     if boat is True:
#         float(first_value)
#         float(second_value)
#     if (o == 'add'):
#         summer = first_value + second_value
#         return f'{mess} {summer}'
#     if (o == 'subtract'):
#         diff = second_value - first_value
#         return mess + diff
#     if (o == 'multiply'):
#         mul = first_value * second_value
#         return mess + mul
#     if (o == 'divide'):
#         div = (first_value / second_value)
#         print(div)
#         print(f'{mess} {div}')

# calculate(make_float=True, operation='divide', first=3.5, second=5)


def letter_counter(string):
    def inner(letter):
        lower_str = string.lower()
        count = lower_str.count(letter)
        print(count)
        return count

    return inner
    pass


counter = letter_counter('Amazing')
counter('a')  # 2


def two_list_dictionary(keys, vals):
    # use dictionary comprehension?
    # zip does not work T_T
    # iterate through keys and build
    # key_dict = {key: None for key in keys}
    # for val in vals
    if len(keys) > len(vals):
        vals.append(None)
    key_dict = {}
    for idx in range(0, len(keys)):
        key_dict[keys[idx]] = vals[idx]
    print(key_dict)
    pass


# two_list_dictionary(['a', 'b', 'c', 'd'], [1, 2, 3])

# {'a': 1, 'b': 2, 'c': 3, 'd': None}

# def longest_named_keyword_value(**kwargs):
#     print(kwargs.keys())
#     key_list = kwargs.keys()
#     longest_word = ''
#     # get length of each key?
#     for word in key_list:
#         if len(word) > len(longest_word):
#             longest_word = word
#     return kwargs[longest_word]
#     pass

# longest_named_keyword_value(short=1, longer=2, omg_longest=3)  # 3

# def only_strings(*args, **kwargs):
#     for element in args:
#         if type(element) is not str:
#             print(False)
#     print(True)
#     pass

# # only_strings("hello", "world")  # True
# only_strings(string1="string", string2="other string")  # True

# Write a function called three_odd_numbers, which accepts a list of numbers
# and returns True if any three consecutive numbers sum to an odd number.


def three_odd_numbers(li):
    # while loop?
    i = 0
    while (i < (len(li) - 3)):
        if (li[i] + li[i + 1] + li[i + 2]) % 2 != 0:
            print(True)
        i += 1
    print(False)
    pass


three_odd_numbers([1, 2, 3, 4, 5])  # True


def reverse_vowels(string):
    chars = string.split('')
    low = 0
    high = len(string) - 1
    vowels = 'aeiouAEIOU'
    temp = ''
    while(low<high):
        while()
    pass
