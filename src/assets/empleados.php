<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$server = "localhost";
$user="root";
$password="";
$db_name="empleados";

$db_conection = new mysqli($server,$user,$password,$db_name);

if(isset($_GET["search"])){
    $employees_sql= mysqli_query($db_conection,"SELECT * FROM employee WHERE id={$_GET['consultar']}");
    echo $employees_sql;
    if(mysqli_num_rows($employees_sql) > 0){
        $employees = mysqli_fetch_all($employees_sql,MYSQLI_ASSOC);
        echo json_encode($employees);
        exit();
    }else{
        echo json_encode(["success"=>0]);
    }
}

if(isset($_GET["delete"])){
    $employees_sql= mysqli_query($db_conection,"DELETE FROM employee WHERE id={$_GET['delete']}");
    if($employees_sql){
        echo json_encode(["success"=>1]);
        exit();
    }else{
        echo json_encode(["success"=>0]);
    }
}

if(isset($_GET["create"])){
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $email= $data->email;
    $employees_sql= mysqli_query($db_conection,"INSERT INTO employee VALUES ('{$name}','{$email}') ");
    echo $employees_sql;
    echo json_encode(["success"=>1]);
    exit();
}

if(isset($_GET["update"])){
    $data = json_decode(file_get_contents("php://input"));
    $id=$data->id;
    $name=$data->name;
    $email=$data->email;
    $employees_sql= mysqli_query($db_conection,"UPDATE employee SET name='{$name}',email='{$email}' WHERE id='{$id}'");
    echo $employees_sql;
    echo json_encode(["success"=>1]);
    exit();
}

$employees_sql= mysqli_query($db_conection,"SELECT * FROM employee");
if(mysqli_num_rows($employees_sql)>0){
    $employees=mysqli_fetch_all($employees_sql,MYSQLI_ASSOC);
    echo $employees_sql;
    echo json_encode($employees);
}else{
    echo json_encode([["success"=>0]]);
}


?>