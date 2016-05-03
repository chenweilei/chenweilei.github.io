<?php
 //获取access_token；
define("APPID", "wx1b04667edbf9788f");
define("APPSECRET", "77213abbf21f2a24e06f401454ac44e0");
 
$token_access_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . APPID . "&secret=" . APPSECRET;
$res = file_get_contents($token_access_url); //获取文件内容或获取网络请求的内容
//echo $res;
$result = json_decode($res, true); //接受一个 JSON 格式的字符串并且把它转换为 PHP 变量
$access_token = $result['access_token'];
//echo $access_token;

//通过access_token获取 jsapi_ticket 卡券
//https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
$jsapi_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" . $access_token . "&type=jsapi";
$res2 = file_get_contents($jsapi_ticket_url); //获取文件内容或获取网络请求的内容
//echo $res;
$result2 = json_decode($res2, true); //接受一个 JSON 格式的字符串并且把它转换为 PHP 变量
$jsapi_ticket = $result2['ticket'];

//echo $jsapi_ticket;
$noncestr='abcd';
$time = time();
//通过jsapi_ticket 卡券生成签名
$signature=sha1("jsapi_ticket" . $jsapi_ticket . "&noncestr=" . $noncestr . "&timestamp=" . $time . "&url=http://mp.weixin.qq.com");

$arr = array ('timestamp'=>$time,'noncestr'=>$noncestr,'signature'=>$signature);
echo json_encode($arr);
?>