#include <bits/stdc++.h>
using namespace std;

int main() {
  unordered_set<int> triangle_no;
  for (int i = 1; i < 100; i++)   {
    triangle_no.insert(i * (i + 1)/ 2);
  }
  int res = 0;
  string tmp;
  while (getline(cin, tmp, ',' )) {
    int sum = 0;
    for (auto ch : tmp) {
      if (ch != '\"') {
        sum += ch - 'A' + 1;
      }
    }
    if (triangle_no.find(sum) != triangle_no.end()) {
      res++;
    }
  }
  cout << res << endl;
}