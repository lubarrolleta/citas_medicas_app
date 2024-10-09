<?php
require_once('../src/utils/Conection.php');

class RestFull  extends Conexion {
    public function __construct(){
        $this->db = parent::__construct();
        // echo "conexion";
    }
    public function GET() {
        header('Content-Type: application/json');
        // $x_type;
        // echo $x_type;
        // $type = "medicos";
        $statements = $this->db->prepare("SELECT * FROM medicos m LEFT JOIN agendamedica agm ON agm.id_medico = m.id");
        // $statements->bindParam(':TYPE',$type);
        if($statements->execute()) {
            echo json_encode($statements->fetchAll(PDO::FETCH_ASSOC),JSON_PRETTY_PRINT);
        }else{
            $error = [
                "error"=>[
                    "message"=>"Invalid"
                ]
                ];
            echo json_encode($error,JSON_PRETTY_PRINT);

        }

       
    }
    public function POST() {
        header('Content-Type: application/json');
        // var_dump($_POST);
        // $data = isset($_POST) ? json_decode($_POST,) :null ;
        // var_dump(http_response_code(200));
        $statements = $this->db->prepare("INSERT INTO citas (id_paciente,id_turno,fecha,hora,estado) VALUES(:idPaciente,:id_turno,:fecha,:hora,:estado)");
        // $statements->bindParam(':idPaciente',$type);
        $statements->bindValue(':idPaciente',$_POST["idPaciente"],PDO::PARAM_INT);
        $statements->bindValue(':id_turno',$_POST["id_turno"],PDO::PARAM_INT);
        $statements->bindValue(':fecha',$_POST["fecha"],PDO::PARAM_STR);
        $statements->bindValue(':hora',$_POST["hora"],PDO::PARAM_STR);
        $statements->bindValue(':estado',$_POST["estado"],PDO::PARAM_STR);
        // $data;
        if($statements->execute()){
            // $statements->
            echo json_encode([
                "success"=> $this->db->lastInsertId()
            ],JSON_PRETTY_PRINT);
        }else{
            echo json_encode([
                "error"=> [
                    "message"=>"Invalid"
                ]
            ],JSON_PRETTY_PRINT);
        }
        // $ultimoId = $statements->lastInsertId();
        // foreach ($_POST as $post) {
        //     # code...
        //     $statements->execute([
        //         "idPaciente" => (int) $post["idPaciente"],
        //         "id_turno"=> (int) $post["id_turno"],
        //         ":fecha"=> $post["fecha"],
        //         ":hora"=>$post["hora"],
        //         ":estado"=>$post["estado"]
        //     ]);
        // }
        // header_s
        
    }
    public function PUT() {
        header('Content-Type: application/json');
        // var_dump($_PUT);
        // Leer los datos crudos de la solicitud
        $datos_put = file_get_contents('php://input');
        // Parsear los datos
        // parse_str($datos_put, $datos);
        // parse_str(file_get_contents("php://input"),$put_vars);
        // Decodificar el JSON
        $datos = json_decode($datos_put, true);
        
        // var_dump($datos_put);
        // var_dump($datos["estado"]);
    // echo $put_vars['foo'];
        $id = getallheaders()["x-type"];
        $statements = $this->db->prepare("UPDATE citas SET estado = :estado WHERE id = :id");
        $statements->bindValue(':estado',trim($datos["estado"]),PDO::PARAM_STR);
        $statements->bindValue(':id',$id,PDO::PARAM_INT);
        if($statements->execute()){
            echo json_encode([
                "success"=> $id
            ],JSON_PRETTY_PRINT);
        }else{
            echo json_encode([
                "error"=> [
                    "message"=>"Invalid"
                ]
            ],JSON_PRETTY_PRINT);
        }
        // echo "<br>conexion PUT";
    }
    public function DELETE() {
        header('Content-Type: application/json');
        $id = trim(getallheaders()["x-type"]);
        $statements = $this->db->prepare("DELETE FROM citas WHERE id = :id");
        $statements->bindValue(':id',$id,PDO::PARAM_INT);
        if($statements->execute()){
            echo json_encode([
                "success"=> $id
            ],JSON_PRETTY_PRINT);
        }else{
            echo json_encode([
                "error"=> [
                    "message"=>"Invalid"
                ]
            ],JSON_PRETTY_PRINT);
        }
        // echo "<br>conexion DELETE ".$id;
    }
}