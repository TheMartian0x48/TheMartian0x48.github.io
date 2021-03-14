#include <bits/stdc++.h>
using namespace std;

int main() {
  long long n = 600851475143;
  int N = 1e6, res = 1;
  vector<bool> prime(N, true);
  for (long long i = 2; i < N; i++) {
    if (prime[i]) {
      if (n % i == 0) 
        res = i;
      for (long long j = i * i; j < N; j += i) {
        prime[j] = false;
      }
    }
  }
  cout << res << endl;
}