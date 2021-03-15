from math import pow

n = int(pow(2, 1000))
res = sum([int(ch) for ch in str(n)])
print(res)
