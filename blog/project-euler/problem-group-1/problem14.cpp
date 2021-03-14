#include <bits/stdc++.h>
using namespace std;

const int N = 10000000;
vector<int> dp(N, 0);

void  solve(long long n) {
  int res = 1;
  int i = n;
  while (n != 1) {
    if (n < N && dp[n]) {
      res += dp[n];
      break;
    }
    res++;
    if (n & 1)
      n = n * 3 + 1;
    else 
      n = n >> 1;
  }
  dp[i] = res;
}

int main() {
  dp[1] = 1;
  int n, res = 1, longest = 1;
  cin >> n;
  for (int i = 1; i <= n; i++) {
    if (dp[i] == 0)
         solve(i);
    if (dp[i] > longest) {
      res = i;
      longest = dp[i];
    }
  }
  cout << res << endl;
}