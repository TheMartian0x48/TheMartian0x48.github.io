#include <bits/stdc++.h>
using namespace std;

int main() {
  long long sum = 0, sq = 0;
  for (int i = 1; i <= 100; i++) {
    sum += i;
    sq += i * i;
  }
  cout << sum * sum - sq << endl;
}