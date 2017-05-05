<?php

	/**
	* version: 1.0.0;
	* 数据库操作类，主要功能：数据库连接，数据库断开，数据库选择，创建表，表的增，删，查，改
	* 接受参数：数据库服务器地址（String）,用户名（String）,密码（String）;
	*/
	class MySqlConfig{
		
		private $conn = null;

		function __construct($servername, $username, $password)
		{
			$this->servername = $servername;
			$this->username = $username;
			$this->password = $password;
			$this->init();
		}

		//初始化
		private function init(){
			if($this->connectMysql()){
				//echo '数据库连接成功';
				return true;
			}else{
				die("Connection failed: " . mysqli_connect_error());
			}
		}

		//连接数据库
		private function connectMysql(){
			$this->conn = mysqli_connect($this->servername, $this->username, $this->password);
			if(!$this->conn){
				return false;
			}else{
				return true;
			}
		}

		//创建数据库
		private function createMysql($sqlname){
			$creat = mysqli_query($this->conn, "CREATE DATABASE ".$sqlname);

			return $creat;
		}

		//断开连接
		public function close(){
			mysqli_close($this->conn);
		}
		
		//选择数据库
		public function selectMysql($sqlname){
			$select = mysqli_select_db($this->conn, $sqlname);
			//如果数据库不存在  则创建
			if(!$select){
				if($this->createMysql($sqlname)){
					//echo '数据库创建成功';
				}else{
					//echo '数据库创建失败：'.mysqli_error($this->conn);
				}
				//创建完之后，继续连接
				$res = mysqli_select_db($this->conn, $sqlname);

				return $res;
			}
		}

		//创建表
		public function createTable($tablename, $sql){
			$creat = mysqli_query($this->conn, $sql);

			return $creat;
		}

		//查询
		public function inquire($arr){
			$tablename = $arr['tablename'];
			 
			if(isset($arr['where'])){
				$where = $arr['where'];
			}else{
				$where = null;
			}

			if(!$tablename) reutrn;

			//拼接查询条件
			$str = $this->whereArr2Str($where);
			//echo $str.'<br>';

			if(!$str){
				$res = mysqli_query($this->conn, "SELECT * FROM ".$tablename);
			}else{
				$res = mysqli_query($this->conn, "SELECT * FROM ".$tablename." WHERE ".$str);
			}

			if(mysqli_num_rows($res) > 0){
				return mysqli_fetch_assoc($res);
			}else{
				return null;
			}
		}

		//插入一条数据
		public function insertInto($arr){
			$tablename = $arr['tablename'];
			$name = $arr['name'];
			$value = $arr['value'];

			$sql = "INSERT INTO ".$tablename."(".$name.") VALUES (".$value.")";

			$res = mysqli_query($this->conn, $sql);

			return $res;
		}

		//删除一条数据
		public function delete($arr){
			$tablename = $arr['tablename'];
			 
			if(isset($arr['where'])){
				$where = $arr['where'];
			}else{
				$where = null;
			}
			if(!$tablename) reutrn;

			//拼接查询条件
			$str = $this->whereArr2Str($where);

			if($str){
				//如果带有条件，则删除符合条件的数据
				$res = mysqli_query($this->conn, "DELETE FROM ".$tablename." WHERE ".$str);
			}else{
				//没有条件 则删除所有数据（清空表）
				$res = mysqli_query($this->conn, "DELETE FROM ".$tablename);
			}

			return $res;
		}

		//更新一条数据
		public function update($tablename, $set, $where){
			if(!isset($tablename)) return ;

			if($where){
				$str = $this->whereArr2Str($where);
			}else{
				$str = null;
			}

			$sql = "UPDATE ".$tablename." SET ".$set." WHERE ".$str;
			//echo '<br>'.$sql;
			// UPDATE test_table SET first_name='chen', last_name='weilei' WHERE first_name='陈2' AND last_name='蔚磊3'
			$res = mysqli_query($this->conn, $sql);

			return $res;
		}

		//拼接条件语句
		private function whereArr2Str($where){
			$str = '';
			$len = count($where);
			if($len == 1){
				$str = $where[0];
			}else if($len == 2){
				$str = $where[0].' AND '.$where[1];
			}else{
				for($i=0; $i<$len; $i++){
					if($i == $len-1){
						$str .=$where[0];
					}else{
						$str .=$where[0].' AND ';
					}
				}
			}
			return $str;
		}
	}

?>