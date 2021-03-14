#include <bits/stdc++.h>
using namespace std;

int main() {
  long long res = 1;
  for (long long i = 1; i <= 20; i++) {
    res = res * i / __gcd(res, i);
  }
  cout << res << endl;
}