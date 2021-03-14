#include <bits/stdc++.h>
using namespace std;

int main() {
  int N = 2e6 + 5;
  vector<bool> prime(N, true);
  for (long long i = 2; i * i < N; i++) {
    if (prime[i]) {
      for (long long j = i * i; j < N; j += i) {
        prime[j] = false;
      }
    }
  }
  long long sum = 0;
  for (int i = 2; i < N - 5; i++) {
    if (prime[i])
      sum += i;
  }
  cout << sum << endl;
}