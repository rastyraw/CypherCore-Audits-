# AWS Elastic Beanstalk Deployment Guide

This guide will walk you through deploying the CipherCore Audits application to AWS Elastic Beanstalk.

## Prerequisites

- AWS Account ([Sign up here](https://aws.amazon.com/))
- AWS CLI installed ([Installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))
- EB CLI installed (Elastic Beanstalk Command Line Interface)
- GitHub repository with your code (✅ Done!)

## Step 1: Install AWS CLI and EB CLI

### Install AWS CLI

**Windows (PowerShell):**
```powershell
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**macOS:**
```bash
brew install awscli
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Verify installation:
```bash
aws --version
```

### Install EB CLI

```bash
pip install awsebcli --upgrade --user
```

Verify installation:
```bash
eb --version
```

## Step 2: Configure AWS Credentials

1. **Create an IAM User** in AWS Console:
   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
   - Click "Users" → "Add users"
   - Username: `ciphercore-deployer`
   - Select "Access key - Programmatic access"
   - Click "Next: Permissions"
   - Attach policy: `AdministratorAccess-AWSElasticBeanstalk` or `AdministratorAccess`
   - Complete the wizard and **save your Access Key ID and Secret Access Key**

2. **Configure AWS CLI:**
```bash
aws configure
```

Enter when prompted:
- AWS Access Key ID: `[Your Access Key]`
- AWS Secret Access Key: `[Your Secret Key]`
- Default region name: `us-east-1` (or your preferred region)
- Default output format: `json`

## Step 3: Initialize Elastic Beanstalk

Navigate to your project directory:
```bash
cd c:\Users\Philm\Downloads\CipherCoreSite\CipherCoreSite
```

Initialize EB:
```bash
eb init
```

Answer the prompts:
1. **Select a default region:** `us-east-1` (or your choice)
2. **Select an application to use:** Create new application
3. **Enter Application Name:** `ciphercore-audits`
4. **It appears you are using Node.js. Is this correct?** Yes
5. **Select a platform branch:** `Node.js 20 running on 64bit Amazon Linux 2023`
6. **Do you wish to continue with CodeCommit?** No
7. **Do you want to set up SSH for your instances?** Yes (recommended for debugging)

## Step 4: Create Elastic Beanstalk Environment

Create your production environment:
```bash
eb create ciphercore-production
```

Answer the prompts:
1. **Enter Environment Name:** `ciphercore-production` (or press Enter for default)
2. **Enter DNS CNAME prefix:** `ciphercore-audits` (this will be your URL)
3. **Select a load balancer type:** `application` (recommended)

This will:
- Create the environment (takes 5-10 minutes)
- Upload your code
- Install dependencies
- Build your application
- Start the server

## Step 5: Configure Environment Variables (Optional)

Set environment variables if needed:
```bash
eb setenv NODE_ENV=production PORT=8080
```

For multiple variables:
```bash
eb setenv KEY1=value1 KEY2=value2
```

## Step 6: Deploy Your Application

Every time you make changes and want to deploy:

```bash
# Make sure your changes are committed to git
git add .
git commit -m "Your commit message"

# Deploy to Elastic Beanstalk
eb deploy
```

## Step 7: Open Your Application

```bash
eb open
```

This will open your deployed application in your default browser!

Your URL will be something like: `http://ciphercore-audits.us-east-1.elasticbeanstalk.com`

## Step 8: Monitor Your Application

### View logs:
```bash
eb logs
```

### View recent logs (streaming):
```bash
eb logs --stream
```

### Check application health:
```bash
eb health
```

### Check environment status:
```bash
eb status
```

## Step 9: Set Up Custom Domain (Optional)

1. **Get your Elastic Beanstalk URL:**
```bash
eb status
```
Look for the CNAME (e.g., `ciphercore-audits.us-east-1.elasticbeanstalk.com`)

2. **Configure DNS:**
   - Go to your domain registrar (e.g., GoDaddy, Namecheap, Route 53)
   - Add a CNAME record:
     - Name: `www` (or `@` for root domain)
     - Value: `ciphercore-audits.us-east-1.elasticbeanstalk.com`
     - TTL: `300`

3. **Or use AWS Route 53** (recommended):
   - Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
   - Create hosted zone for your domain
   - Create an alias record pointing to your EB environment

## Common EB CLI Commands

```bash
# List all environments
eb list

# Switch between environments
eb use [environment-name]

# View environment info
eb status

# SSH into instance
eb ssh

# Scale your application
eb scale 2  # Run 2 instances

# Terminate environment (CAUTION!)
eb terminate ciphercore-production

# Restart application
eb restart
```

## Continuous Deployment from GitHub

### Option 1: AWS CodePipeline (Automated)

1. Go to [AWS CodePipeline Console](https://console.aws.amazon.com/codesuite/codepipeline/)
2. Create new pipeline
3. Choose GitHub as source
4. Connect your repository: `rastyraw/CypherCore-Audits-`
5. Choose branch: `main`
6. Skip build stage (EB will build)
7. Choose Elastic Beanstalk as deploy provider
8. Select your application and environment

Now every push to `main` will auto-deploy!

### Option 2: GitHub Actions (Alternative)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS Elastic Beanstalk

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to EB
        run: |
          pip install awsebcli
          eb deploy ciphercore-production
```

Add secrets in GitHub:
- Go to repository Settings → Secrets and variables → Actions
- Add `AWS_ACCESS_KEY_ID`
- Add `AWS_SECRET_ACCESS_KEY`

## Troubleshooting

### Build fails during deployment

Check logs:
```bash
eb logs --all
```

Common issues:
- **Out of memory:** Upgrade instance type in EB console
- **Build timeout:** Increase timeout in `.ebextensions/nodecommand.config`
- **Missing dependencies:** Make sure all dependencies are in `package.json`, not just `devDependencies`

### Application won't start

1. Check if port is correct (should be 8080 for EB)
2. Verify `NODE_ENV=production` is set
3. Check logs: `eb logs`
4. SSH into instance: `eb ssh` and manually check

### 502 Bad Gateway

Usually means the application crashed:
1. `eb logs` to see error
2. Common causes:
   - Port mismatch (use `process.env.PORT || 8080`)
   - Missing environment variables
   - Build artifacts not generated

## Costs

AWS Elastic Beanstalk pricing:
- **EB platform:** Free
- **EC2 instance:** ~$10-30/month (t3.micro to t3.small)
- **Load balancer:** ~$16/month (if using Application Load Balancer)
- **Data transfer:** Varies based on traffic

**Free Tier:** First 750 hours/month of t2.micro or t3.micro for 12 months

To minimize costs:
- Use t3.micro instance
- Single instance (no load balancer) for development
- Scale up only when needed

## Scaling Your Application

### Automatic Scaling

Configure in EB Console:
1. Go to Configuration → Capacity
2. Set Auto Scaling:
   - Min instances: 1
   - Max instances: 4
   - Metric: CPU utilization
   - Threshold: 75%

### Manual Scaling

```bash
# Scale to 3 instances
eb scale 3
```

## Security Best Practices

1. **Use environment variables** for sensitive data (never commit secrets)
2. **Enable HTTPS:**
   - Get SSL certificate from AWS Certificate Manager (free)
   - Configure in EB Console → Configuration → Load Balancer
3. **Restrict access:**
   - Configure security groups in EB Console
   - Use AWS WAF for DDoS protection
4. **Regular updates:**
   - Keep dependencies updated: `npm update`
   - Update Node.js version as needed

## Rollback

If deployment fails or has issues:

```bash
# List all application versions
eb appversion

# Rollback to previous version
eb deploy --version [version-label]
```

Or use AWS Console:
1. Go to Elastic Beanstalk → Applications → Versions
2. Select previous version
3. Click "Deploy"

## Support

- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [EB CLI Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)
- [AWS Support](https://console.aws.amazon.com/support/)

---

## Quick Start Summary

```bash
# 1. Install AWS CLI and EB CLI
pip install awsebcli --upgrade --user

# 2. Configure AWS
aws configure

# 3. Initialize EB
cd c:\Users\Philm\Downloads\CipherCoreSite\CipherCoreSite
eb init

# 4. Create environment
eb create ciphercore-production

# 5. Deploy
eb deploy

# 6. Open app
eb open
```

That's it! Your CipherCore Audits platform is now live on AWS! 🚀
