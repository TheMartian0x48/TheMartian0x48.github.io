#include <bits/stdc++.h>
using namespace std;

int main() {
  int res = 0, ub = 10000000;
  for (int i = 2; i <= ub; i++) {
    int n = i, m = 0;
    while (n > 0) {
      m += pow(n % 10, 5);
      n /= 10;
    }
    if (i == m) res += m;
  }
  cout << res;
}