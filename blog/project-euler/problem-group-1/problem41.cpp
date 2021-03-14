#include <bits/stdc++.h>
using namespace std;

const int N = 1e5;
vector<bool> isprime(N, true);
vector<long long> primes;

void GeneratePrime() {
  isprime[0] = false;
  isprime[1] = false;
 // generate prime less than 10^5  
  for (long long i = 2; i < N; i++) {
    if (isprime[i]) {
      primes.push_back(i);
      for (long long j = i * i; j < N; j += i) {
        isprime[j] = false;
      }
    }
  }
}

bool IsPrime(long long n) {
  if (n < N) return isprime[n];
  for (auto a : primes) {
    if (a * a > n) break;
    if (n % a == 0) return false;
  }
  return true;
}

int main() { 
  GeneratePrime();
  for (int n = 9; n > 0; n--) {
    string s;
    for (int i = n; i > 0; i-- ) {
      s += '0' + i;
    }
    do {
      long long tmp =  stoll(s);
      if (IsPrime(tmp)) {
        cout << tmp << endl;
        return 0;
      }
    } while (prev_permutation(s.begin(), s.end()));
  }
}