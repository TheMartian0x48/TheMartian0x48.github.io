#include <bits/stdc++.h>
using namespace std;

int main() {
  int n = 21;
  vector<vector<long long>> v(n, vector<long long>(n, 0));
  v[0][0] = 1;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      if (i - 1 >= 0)
        v[i][j] += v[i - 1][j];
      if (j - 1 >= 0) 
        v[i][j] += v[i][j - 1];
    }
  }
  cout << v[n - 1][n - 1] << endl;
}