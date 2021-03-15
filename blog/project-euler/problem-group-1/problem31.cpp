#include <bits/stdc++.h>
using namespace std;

vector<int> coin{1, 2, 5, 10, 20, 50, 100, 200};

int solve(int s, int i = 0) {
  if (i == (int)coin.size()) {
    return s == 0;
  }
  int res = 0;
  while (s >= 0) {
    res += solve(s, i + 1);
    s -= coin[i];
  }
  return res;
}

int main() {
  int res = solve(200);
  cout << res << endl;
}