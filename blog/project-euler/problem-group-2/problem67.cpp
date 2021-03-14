#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<vector<long long>> v;
  string s;
  while (getline(cin, s)) {
    v.push_back({});
    stringstream ss(s);
    int t;
    while(ss >> t) {
      v.back().push_back(t);
    }
  }
  int n = v.size();
  for (int i = 1; i < n; i++) {
    for (int j = 0; j <= i; j++) {
      long long tmp = 0;
      if (j) 
        tmp = max(tmp, v[i - 1][j - 1]);
      if (j < (int) v[i - 1].size())  
        tmp = max(tmp, v[i - 1][j]);
      v[i][j] += tmp;
    }
  }
  long long res = 0;
  for (auto a : v[n - 1]) {
    res = max(res, a);
  }
  cout << res << endl;
}