#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<int> fac(10);
  fac[0] = 1;
  for (int i = 1; i < 10; i++)
    fac[i] = i * fac[i - 1];
  
  vector<bool> used(10, false);
  int n = 1000000;
  for (int i = 0; i < 10; i++) {
    int j = 0;
    int m = 0;
    while (m < n) {
      m += fac[9 - i];
      j++;
    }
    n -= m - fac[9 - i];
    int k = 0;
    while (j > 0) {
      if (used[k] == false) {
        j--;
      }
      k++;
    }
    used[k - 1] = true;
    cout << k - 1;
  }
}