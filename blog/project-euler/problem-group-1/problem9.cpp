#include <bits/stdc++.h>
using namespace std;

int main() {
  for (int a = 1; a < 334; a++) {
    for (int b = a + 1;; b++) {
      int c = 1000 - a - b;
      if (c <= b) break;
      if (c * c == a * a + b * b) {
        cout << a * b * c << endl;
        return 0;
      }
    }
  }
}