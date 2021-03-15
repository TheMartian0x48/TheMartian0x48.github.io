#include <bits/stdc++.h>
using namespace std;

int main() {
  int n = 10001;
  vector<int> d(n);
  for (int i = 1; i < n; i++) {
    int s = 0;
    for (int j = 1; j * j <= i; j++) {
      if (i % j == 0) {
        s += j;
        if (j * j != i) {
          s += i / j;
        }
      }
    }
    d[i] = s - i;
  }
  int res = 0;
  for (int i = 1; i < n; i++) {
    int b = d[i];
    if (b < n && b != i && d[b] == i) {
      res += i;
    }
  }
  cout << res << endl;
}