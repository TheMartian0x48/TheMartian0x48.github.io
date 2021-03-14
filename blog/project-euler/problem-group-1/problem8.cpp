#include <bits/stdc++.h>
using namespace std;

int main() {
  string s, tmp;
  for (int i = 0; i < 20; i++) {
    cin >> tmp;
    s += tmp;
  }
  long long res = 0, pro = 1;
  for (int i = 0, j = 0; i < (int)s.size(); i++) {
    if (s[i] == '0') {
      j = i + 1;
      pro = 1;
      continue;
    }
    pro *= (s[i] - '0');
    if (i - j + 1 > 13) {
      pro /= (s[j] - '0');
      j++;
    }
    if (i - j + 1 == 13) {
      res = max(res, pro);
    }
  }
  cout << res << endl;
}