echo "==========================================="
echo "1. Install Dependency"
echo "==========================================="
sudo apt-get update
sudo apt-get install npm nginx git -y

echo "==========================================="
echo "2. Repository Check, Git Configure, Pull"
echo "==========================================="
git config --global user.email hyeok6640@gmail.com
git config --global user.name yoonhyeokCho
cd ~
[ -d team2-BACKEND ] || git clone https://github.com/BiBimBapXOpenStack/team2-BACKEND.git
cd ~/team2-BACKEND
git fetch --all
git reset --hard origin/develop
git pull origin develop

echo "==========================================="
echo "3. Set Nginx"
echo "==========================================="
cd /etc/nginx/sites-enabled
sudo rm default
cd ~/team2-BACKEND/bin/config
sudo cp team2-back.conf /etc/nginx/sites-enabled
echo "*** sites-enabled/team2-back.conf ***"
sudo cat /etc/nginx/sites-enabled/team2-back.conf

echo "==========================================="
echo "4. Build"
echo "==========================================="
cd ~/team2-BACKEND/BACKEND
sudo npm install
sudo npm install pm2 -g
pm2 start app.js

echo "==========================================="
echo "5. Nginx restart"
echo "==========================================="
sudo vi /etc/nginx/sites-enabled/team2-back.conf
