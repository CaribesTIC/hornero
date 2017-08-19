<div class="column-group drop-zone button-toolbar" id="demo-dragdrop-2">
        <?php 
        $html = '';
        foreach ($campos as $key => $value)
                { ?>
        <div class='all-100 tiny-100 drag-item quarter-space accordion' id="<?=$tabla?>_<?=$value->Field?>">
                <div class="ink-button all-100 ">
                       <i class='fa fa-arrows-alt drag-handle push-left iconMove'></i>
                       <span class="push-left">&nbsp;<?=$value->Field?></span>
                       <i id="iconOpen" class='fa fa-plus drag-handle push-right iconOpen'></i>
                </div>
                <div class="panel quarter-space" id="div_<?=$tabla?>_<?=$value->Field?>">
                <?php $this->insert('view::home/formTabsCampos',['tabla'=>$tabla,'campo'=>$value->Field]) ?>

                </div>
        </div>    

        <?php   }
        ?>

</div>


<style type="text/css" media="screen">
        /* Style the buttons that are used to open and close the accordion panel */
        .accordion {
                background-color: #eee;
                color: #444;
                overflow: hidden;
                border: none;
                outline: none;
                transition: 0.4s;
                -webkit-box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);
                -moz-box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);
                box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);

        }

        /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
        .accordion.active, .accordion:hover {
                background-color: #ddd;
        }

        /* Style the accordion panel. Note: hidden by default */
        div.panel {
                background-color: white;
                -webkit-box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);
                -moz-box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);
                box-shadow: 11px 10px 7px -1px rgba(0,0,0,0.12);

        }

</style>


