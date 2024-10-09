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
        $statements = $this->db->prepare("SELECT *,p.id as idPaciente FROM pacientes p LEFT JOIN citas c ON c.id_paciente = p.id");
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
        echo "<br>conexion POST";
    }
    public function PUT() {
        echo "<br>conexion PUT";
    }
    public function DELETE() {
        echo "<br>conexion DELETE";
    }
}