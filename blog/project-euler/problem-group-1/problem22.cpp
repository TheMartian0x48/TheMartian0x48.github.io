#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<pair<string, int>> v;
  string s;
  while(getline(cin, s, ',')) {
    int tmp = 0;
    for (auto ch : s) {
      if (ch != '\"')
        tmp += ch - 'A' + 1;
    }
    v.push_back({s, tmp});
  }
  sort(v.begin(), v.end());
  long long res = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    res += (long long)v[i].second * (i + 1);
  }
  cout << res  << endl;
}