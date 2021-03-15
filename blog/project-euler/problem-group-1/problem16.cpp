#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<int> n(500, 0);
  n[0] = 1;
  for (int i = 0; i < 1000; i++) {
    int carry = 0;
    for (int j = 0; j < 500; j++) {
      int d = n[j] * 2 + carry;
      carry = d / 10;
      n[j] = d % 10;
    }
  }
  int res =  0;
  for (auto a : n) {
    res += a;
  }
  cout << res;
}