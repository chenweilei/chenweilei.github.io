<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx996d3493e3952f71", "33ff921c459398454c1a6fd616d70688");
$signPackage = $jssdk->GetSignPackage();
echo json_encode($signPackage);

?>
