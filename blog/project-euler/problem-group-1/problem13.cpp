#include <bits/stdc++.h>
using namespace std;

string add(const string&a, const string&b) {
  int i = a.size() - 1, j = b.size() - 1, carry = 0;
  string res = "";
  while (i >= 0 || j >= 0) {
    int d = carry;
    if(i >= 0) 
      d += a[i] - '0';
    if (j >= 0)
      d += b[j] - '0';
    carry = d / 10;
    res += '0' + (d % 10);
    i--, j--;
  }
  if (carry) res += '1';
  reverse(res.begin(), res.end());
  return res;
}

int main() {
  string sum = "", a;
  int n = 100;
  for (int i = 0; i < n; i++) {
    cin >> a;
    sum = add(sum, a);
  }
  
  cout << sum.substr(0, 10) << endl;
}