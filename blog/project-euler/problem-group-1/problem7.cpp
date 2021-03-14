#include <bits/stdc++.h>
using namespace std;

int main() {
  int N = 1e6, n = 10001;
  vector<bool> prime(N, true);
  for (long long i = 2; i * i < N; i++) {
    if (prime[i]) {
      for (long long j = i * i; j < N; j += i) {
        prime[j] = false;
      }
    }
  }
  for (int i = 2; i < N; i++) {
    if (prime[i])
      n--;
    if (n == 0) {
      cout << i << endl;
      return 0;
    }
  }
}