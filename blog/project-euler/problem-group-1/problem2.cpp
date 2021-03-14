#include <bits/stdc++.h>
using namespace std;

int main() {
  int upper_bound = 4e6;
  long long res = 0;
  int a = 1, b = 2;
  while (b < upper_bound) {
    if (b % 2 == 0) res += b;
    int tmp = b + a;
    a = b;
    b = tmp;
  }
  cout << res << endl;
}