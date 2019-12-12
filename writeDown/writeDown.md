### 如何查看电脑的公钥
cat ~/.ssh/id_rsa.pub
回车后就可以看到公钥，把公钥粘贴到gitHub上便可以使用了

### 回退到上一个commit的版本
git reset --hard
### 撤销commit 
git reset --soft HEAD^
### 修改上一个commit 
git commit --amend
### 修改上一个commit 
git reset 撤销所有的add文件
git reset + 文件名 撤销某个文件的add提交