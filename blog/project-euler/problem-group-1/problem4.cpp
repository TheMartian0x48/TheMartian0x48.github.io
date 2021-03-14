#include <bits/stdc++.h>
using namespace std;

int main() {
  int res = 1;
  for (int i = 100; i < 1000; i++) {
    for (int j = i + 1; j < 1000; j++) {
      string n = to_string(i * j);
      int p1 = 0, p2 = n.size() - 1;
      bool pali = true;
      while (p1 < p2) {
        if (n[p1] != n[p2]) {
          pali = false;
          break;
        }
        p1++, p2--;
      }
      if (pali)
        res = max(res, i * j);
    }
  }
  cout << res << endl;
}