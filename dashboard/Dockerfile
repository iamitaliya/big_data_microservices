FROM ubuntu

WORKDIR /dashboard

COPY . .


RUN apt-get update
RUN apt-get -y install python3
RUN apt-get install -y python3-pip
RUN pip3 install -r requirements.txt

ENV PORT 5555

EXPOSE 5555

CMD ["python3", "microservice_dashboard.py"]