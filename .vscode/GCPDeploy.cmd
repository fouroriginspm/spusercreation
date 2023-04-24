@echo off
echo "Deploying to GCP"
echo Building image...
for /f "tokens=1,2 delims==" %%i in (.env) do (
  set %%i=%%j
)

echo %NPM_TOKEN%

docker build -t gcr.io/fospm-383806/usercreation:v1 .
echo "Image built successfully"
@REM gcloud config set project fospm-383806
@REM gcloud config set compute/region asia-southeast1
@REM gcloud auth login
@REM gcloud auth configure-docker
docker push gcr.io/fospm-383806/usercreation:v1
echo "Image successfully pushed to GCP"