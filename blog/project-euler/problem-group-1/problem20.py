
fac = 1
for i in range(1, 100):
  fac *= i

res = 0
for d in str(fac):
  res += int(d)

print(res)