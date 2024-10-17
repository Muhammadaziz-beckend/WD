from bike.models import Bike, Flag
from random import randint, choice


def clone_bike(count):
    arr = []
    bike2 = Bike.objects.first()
    flags = list(Flag.objects.all())

    if not bike2 or not flags:
        return arr

    for i in range(count):
        bike = bike2

        bike.id = None
        bike.price = randint(10000, 40000)
        bike.flag = choice(flags)

        bike.save()
        arr.append(bike)

    return arr
