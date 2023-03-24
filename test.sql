LOAD DATA INFILE '/var/lib/mysql-files/test.csv'
INTO TABLE questions_question
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(text,cha,chb,chc,chd,ans,job_id);