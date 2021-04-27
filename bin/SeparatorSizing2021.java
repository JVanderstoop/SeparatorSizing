package bin; 
import javax.swing.*;
import javax.swing.event.MouseInputListener;
import java.lang.Math;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Separator Sizing 2021 for Bernie Neilsen; 
 * @author by Josh Vanderstoop 
 * @version 2.1
 * written using java @since 2.0
 * 
 * Latest additions: 
 * 	- reorganized code, more user friendly GUI
 */

public class SeparatorSizing2021 implements ActionListener{

    /**
     * Buttons
     * help the user navigate through windows and create others
     */
    private Button  calcButton      = new Button("Calculate"),
                    table2_9        = new Button("Display Table 2.9"),
                    compTable       = new Button("Display Compressability Table");

    /**
     * ImageIcon
     * collect the images from the current folder under the respective name 
     */
    private ImageIcon   Im2_9       = new ImageIcon("lib/Table2_9.png"),
                        Imcomp      = new ImageIcon("lib/CompTable.png");

    /**
     * TextField
     * will be used to obtain the user input for calculations
     */
    private TextField   inC2 =  new TextField(8),
                        inC3 = new TextField(8), 
                        inC4 = new TextField(8), 
                        inC5 = new TextField(8),
                        inC6 = new TextField(8),
                        inC7 = new TextField(8),
                        inC9 = new TextField(8),
                        inC10 = new TextField(8),
                        inC13 = new TextField(8),
                        inC14 = new TextField(8),
                        inC15 = new TextField(8),
                        inC16 = new TextField(8),
                        inD16 = new TextField(8),
                        inE16 = new TextField(8),
                        inC17 = new TextField(8),
                        inD17 = new TextField(8),
                        inE17 = new TextField(8),
                        inC18 =new TextField(8),
                        inD18 = new TextField(8),
                        inE18 = new TextField(8),
                        inC19 = new TextField(8),
                        inD19 = new TextField(8),
                        inE19 = new TextField(8),
                        inC20 = new TextField(8); 
                        
/**
 * JLabel
 * indicates to the user which TextField to use
 */
private  JLabel     LaC2  = new JLabel("<html>Gas rate [Sm<sup>3</sup>/day]:</html>"),
                    LaC3  = new JLabel("<html>Oil rate [m<sup>3</sup>/day]:</html>"),
                    LaC4  = new JLabel("<html>Water rate [m<sup>3</sup>/day]:</html>"),
                    LaC5  = new JLabel("Gas [MW]:"),
                    LaC6  = new JLabel("<html>Oil density [kg/m<sup>3</sup>]:</html>"),
                    LaC7  = new JLabel("<html>Water density [kg/m<sup>3</sup>]:</html>"),
                    LaC9  = new JLabel("Separator operating pressure [kPag]:"),
                    LaC10 = new JLabel("<html>Separator operating temperature [<sup>o</sup>C]:</html>"),
            
                    LaC13 = new JLabel("Separator Outter Diameter [mm]:"),
                    LaC14 = new JLabel("Wall thickness [mm]:"),
                    LaC15 = new JLabel("Separator height (seam-seam) [mm]:"),
                    
                GOHeader = new JLabel("----Gas outlet nozzle properties---- "),
                    LaC16 = new JLabel("Outter diameter [mm]:"),
                    LaD16 = new JLabel("Elevation [mm]:"),
                    LaE16 = new JLabel("Inner diameter [mm]:"),
                    
                VIHeader = new JLabel("----Vessel inlet nozzle properties----"),
                    LaC17 = new JLabel("Outter diameter [mm]:"),
                    LaD17 = new JLabel("Elevation [mm]:"),
                    LaE17 = new JLabel("Inner diameter [mm]:"),
                    
                HCHeader = new JLabel("----HC outlet nozzle properties----"),
                    LaC18 = new JLabel("Outter diameter [mm]:"),
                    LaD18 = new JLabel("Elevation [mm]:"),
                    LaE18 = new JLabel("Inner diameter [mm]:"),
                    
                WOHeader = new JLabel("----Water outler nozzle properties----"),
                    LaC19 = new JLabel("Outter diameter [mm]:"),
                    LaD19 = new JLabel("Elevation [mm]:"),
                    LaE19 = new JLabel("Inner diameter [mm]:"),
                    
                    LaC20 = new JLabel ("Elevation of HLSD [mm]:"),

                    La2_9 = new JLabel(),
                    LaComp = new JLabel();
         
/**
 * Font
 * gives different sizes and fonts to labels that are emphasized
 */
private Font        bolded = new Font(null, Font.BOLD, 15),
                    italic = new Font(null, Font.ITALIC + Font.BOLD, 13);

/**
 * iterative for the tab titles
 */
public int          i = 1; 

         

public JFrame mainWindow = new JFrame("Separator Sizing");

public JTabbedPane mainTab = new JTabbedPane(JTabbedPane.TOP);

    public SeparatorSizing2021()
    {
        mainWindow.setLayout(new GridLayout(1, 1));
        mainWindow.setSize(1250, 429); 
        mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainWindow.setResizable(false);
        mainTab.addTab("User Input", generateUserInputPanel());
        mainWindow.add(mainTab);
        mainWindow.setVisible(true);
        calcButton.addActionListener(this);
        table2_9.addActionListener(this);
        compTable.addActionListener(this);
    }

    public JPanel generateUserInputPanel()
    {
        JPanel inputPanel = inputPanelSetup();
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(table2_9);
        buttonPanel.add(compTable);
        buttonPanel.add(calcButton);

        inputPanel.add(buttonPanel, BorderLayout.SOUTH);
        return inputPanel; 
    }

    public JPanel inputPanelSetup()
    {
        JPanel inputPanel = new JPanel(new BorderLayout(10, 20));

        JPanel firstInputs = firstInputsSetup(); 
        JPanel gonPanel = gonPanelSetup();
        JPanel vinPanel = vinPanelSetup();
        JPanel hconPanel = hconPanelSetup();
        JPanel wonPanel = wonPanelSetup();

        JPanel nozzleSetup = new JPanel(new GridLayout(1, 4));
        nozzleSetup.add(gonPanel);
        nozzleSetup.add(vinPanel);
        nozzleSetup.add(hconPanel);
        nozzleSetup.add(wonPanel);

        inputPanel.add(firstInputs, BorderLayout.NORTH);
        inputPanel.add(nozzleSetup, BorderLayout.CENTER);

        return inputPanel;
    }

    public JPanel firstInputsSetup()
    {
        JPanel firstInputs = new JPanel(new GridLayout(1, 4, 10, 0));

        JPanel row1 = new JPanel(new GridLayout(6,1)); 
        row1.add(LaC2);
        row1.add(inC2);
        row1.add(LaC3);
        row1.add(inC3);
        row1.add(LaC4);
        row1.add(inC4);

        JPanel row2 = new JPanel(new GridLayout(6,1)); 
        row2.add(LaC5);
        row2.add(inC5);
        row2.add(LaC6);
        row2.add(inC6);
        row2.add(LaC7);
        row2.add(inC7);

        JPanel row3 = new JPanel(new GridLayout(6,1)); 
        row3.add(LaC9);
        row3.add(inC9);
        row3.add(LaC10);
        row3.add(inC10);
        row3.add(LaC20);
        row3.add(inC20);

        JPanel row4 = new JPanel(new GridLayout(6, 1)); 
        row4.add(LaC13);
        row4.add(inC13);
        row4.add(LaC14);
        row4.add(inC14);
        row4.add(LaC15);
        row4.add(inC15);

        firstInputs.add(row1);
        firstInputs.add(row2);
        firstInputs.add(row3);
        firstInputs.add(row4);
        return firstInputs;
    }

    public JPanel gonPanelSetup()
    {
        JPanel gonPanel = new JPanel(new BorderLayout()); 
        GOHeader.setFont(bolded);
        gonPanel.add(GOHeader, BorderLayout.NORTH);
        JPanel flowgon = new JPanel(new FlowLayout(FlowLayout.LEADING, 10, 15));
        flowgon.add(LaC16);
        flowgon.add(inC16);
        flowgon.add(LaD16);
        flowgon.add(inD16);
        flowgon.add(LaE16);
        flowgon.add(inE16);

        gonPanel.add(flowgon, BorderLayout.CENTER);
        return gonPanel;
    }

    public JPanel vinPanelSetup()
    {
        JPanel vinPanel = new JPanel(new BorderLayout()); 
        VIHeader.setFont(bolded);
        vinPanel.add(VIHeader, BorderLayout.NORTH);
        JPanel flowvin = new JPanel(new FlowLayout(FlowLayout.LEADING, 10, 15));

        flowvin.add(LaC17);
        flowvin.add(inC17);
        flowvin.add(LaD17);
        flowvin.add(inD17);
        flowvin.add(LaE17);
        flowvin.add(inE17);

        vinPanel.add(flowvin, BorderLayout.CENTER);
        return vinPanel; 
    }

    public JPanel hconPanelSetup()
    {
        JPanel hconPanel = new JPanel(new BorderLayout()); 
        HCHeader.setFont(bolded);
        hconPanel.add(HCHeader, BorderLayout.NORTH);
        JPanel flowhcon = new JPanel(new FlowLayout(FlowLayout.LEADING, 10, 15));

        flowhcon.add(LaC18);
        flowhcon.add(inC18);
        flowhcon.add(LaD18);
        flowhcon.add(inD18);
        flowhcon.add(LaE18);
        flowhcon.add(inE18);
        
        hconPanel.add(flowhcon, BorderLayout.CENTER);
        return hconPanel; 
    }

    public JPanel wonPanelSetup()
    {
        JPanel wonPanel = new JPanel(new BorderLayout()); 
        WOHeader.setFont(bolded);
        wonPanel.add(WOHeader, BorderLayout.NORTH);
        JPanel flowwon = new JPanel(new FlowLayout(FlowLayout.LEADING, 10, 15));

        flowwon.add(LaC19);
        flowwon.add(inC19);
        flowwon.add(LaD19);
        flowwon.add(inD19);
        flowwon.add(LaE19);
        flowwon.add(inE19);

        wonPanel.add(flowwon, BorderLayout.CENTER);
        return wonPanel;    
    }

    public JPanel calculationsTab(double C2, double  C3, double  C4, double  C5, double  C6, double  C7, double  C9, double  C10,
                                            double C13, double  C14, double  C15, double  C16, double  D16, double  E16, double  C17, 
                                                double  C18, double  C19, double  C20, double  D17, double  D18, double  D19, 
                                                    double  E17, double  E18, double  E19)
    {
        Calculator calc = new Calculator(C2, C3, C4, C5, C6, C7, C9 , C10, C13, C14, C15, C16, D16, E16, C17, C18, C19, C20, D17, D18, D19, E17, E18, E19);
        JPanel calcPanel = new JPanel (new FlowLayout(FlowLayout.LEADING, 30 , 1));
        //calcPanel.setBackground(Color.black);
        calcPanel.add(wrtPanelSetup(calc));
        calcPanel.add(ratePanelSetup(calc));
        calcPanel.add(combinedPanelSetup(calc));
        calcPanel.add(splitPanelSetup(calc));
        calcPanel.add(ortPanelSetup(calc));
        calcPanel.add(nsPanelSetup(calc)); 
        //System.out.println(calc.C35+ " " + calc.C36+ " " + calc.C38+ " " + calc.C39+ " " + calc.C40+ " " + calc.C41+ " " + calc.C43+ " " + calc.C44+ " " + calc.C45+ " " + calc.C46+ " " + calc.C47+ " " + calc.C48+ " " + calc.C49+ " " + calc.C52+ " " + calc.C53+ " " + calc.C54+ " " + calc.C57+ " " + calc.C58+ " " + calc.C59 + " " + calc.C64+ " " + calc.C65+ " " + calc.C66+ " " + calc.C67+ " " + calc.C70+ " " + calc.C71+ " " + calc.C72+ " " + calc.C76+ " " + calc.C77);
        return calcPanel; 
    }

    public JPanel combinedPanelSetup(Calculator calc)
    {
        JPanel combinedPanel = new JPanel (new GridLayout(5, 1, 2, 8));
        combinedPanel.add(new JLabel( "Vessel inner diameter [mm]:  " + String.format( "%.4f", calc.C35) ));
        combinedPanel.add(new JLabel( "Vessel cross sectional area[mm]:  " + String.format( "%.4f", calc.C36)  ));
        combinedPanel.add(new JLabel( "Gas velocity in vessel [m/s]:  " + String.format( "%.4f", calc.C49)));
        combinedPanel.add(new JLabel( "<html>Q<sub>g</sub> at separator conditions [m<sup>3</sup>/d]: " + "  " +  String.format( "%.4f", calc.C46)));
        return combinedPanel; 
    }

    public JPanel splitPanelSetup(Calculator calc)
    {
        JPanel combinedPanel = new JPanel (new GridLayout(5, 1, 2, 8));
        combinedPanel.add(new JLabel( "<html>Reference conditions compressability(Z<sub>1</sub>): " + "  " +   String.format( "%.4f", calc.C43) ));
        combinedPanel.add(new JLabel( "<html>Separator conditions compressability(Z<sub>2</sub>): " + "  " +   String.format( "%.4f", calc.C44) ));
        combinedPanel.add(new JLabel( "<html>Gas density at separator conditions [kg/m<sup>3</sup>]: " + "  "   + String.format( "%.4f", calc.C45) ));
        combinedPanel.add(new JLabel( "<html>V<sub>gmax</sub> [m/s]: " + "  " +   String.format( "%.4f", calc.C48) ));
        combinedPanel.add(new JLabel( "Ks: " + String.format( "%.4f", calc.C47) ));
        return combinedPanel;
    }

    public JPanel ratePanelSetup(Calculator calc)
    {
        JPanel ratePanel = new JPanel (new GridLayout(8, 2, 1, 2));
        ratePanel.add(new JLabel( "Gas rate [kg/day]:  "));
        ratePanel.add(new JLabel( String.format("%.4f", calc.C38) ));
        ratePanel.add(new JLabel( "Oil rate [kg/day]:  "));
        ratePanel.add(new JLabel( String.format("%.4f", calc.C39)) );
        ratePanel.add(new JLabel( "<html>Emulsion density [kg/m<sup>3</sup>]: " ));
        ratePanel.add(new JLabel( String.format("%.4f", calc.C41)) );
        ratePanel.add(new JLabel( "Water rate [kg/day]:  "));
        ratePanel.add(new JLabel( String.format("%.4f", calc.C40)) );
        return ratePanel;
    }

    public JPanel ortPanelSetup(Calculator calc)
    {
        JPanel ortPanel = new JPanel(new GridLayout(6, 1, 0, 7));
        JLabel ortLabel = new JLabel( "------Oil Retention Time------");
        ortLabel.setFont(bolded);
        ortPanel.add(ortLabel);
        ortPanel.add(new JLabel( "Height of seal layer above HC out nozzle [mm]:  "));
        ortPanel.add(new JLabel(  String.format("%.4f", calc.C52)) );
        ortPanel.add(new JLabel( "<html>Vessel oil volume [m<sup>3</sup>]: " + "  "  ));
        ortPanel.add(new JLabel( String.format("%.4f", calc.C53)));
        ortPanel.add(new JLabel( "Oil retention time [minutes]:  " + String.format("%.4f", calc.C54) ));
        return ortPanel;
    }

    public JPanel wrtPanelSetup(Calculator calc)
    {
        JPanel wrtPanel = new JPanel(new GridLayout(6, 1, 0, 7));
        JLabel wrtLabel = new JLabel( "------Water Retention Time------");
        wrtLabel.setFont(bolded);
        wrtPanel.add(wrtLabel);
        wrtPanel.add(new JLabel( "Height of seal layer above water in nozzle [mm]:  "));
        wrtPanel.add(new JLabel(  String.format("%.4f", calc.C57)));
        wrtPanel.add(new JLabel( "<html>Vessel water volume [m<sup>3</sup>]: " + "  "   ));
        wrtPanel.add(new JLabel( String.format("%.4f", calc.C58)));
        wrtPanel.add(new JLabel( "Water retention time [minutes]:  " + String.format("%.4f", calc.C59)));
        return wrtPanel;
    }

    public JPanel nsPanelSetup(Calculator calc)
    {
        JPanel nsPanel = new JPanel(new GridLayout(1, 4, 1, 1));

        JPanel inPanel = new JPanel(new GridLayout(5, 1, 0, 6));
        JLabel inLabel = new JLabel( "Inlet Nozzle");
        inLabel.setFont(bolded);
        inPanel.add(inLabel);
        inPanel.add(new JLabel( "<html>   Mixture density [kg/m<sup>3</sup>]: " + "  "   + String.format("%.4f", calc.C64)) );
        inPanel.add(new JLabel( "<html>   Area of inlet nozzle [m<sup>2</sup>]: " + "  "   + String.format("%.4f", calc.C65)) );
        inPanel.add(new JLabel( "Mixture velocity [m/s]:  " + String.format("%.4f", calc.C66) ));
        inPanel.add(new JLabel( "<html>   P<sub>m</sub> * V<sub>m</sub><sup>2</sup>: " + "  "  + String.format("%.4f", calc.C67) ));

        JPanel onPanel = new JPanel(new GridLayout(5, 1, 0, 6));
        JLabel onLabel =new JLabel( "Outlet Nozzle"  );
        onLabel.setFont(bolded);
        onPanel.add(onLabel);
        onPanel.add(new JLabel( "<html>   Area of outlet nozzle [m<sup>2</sup>]: " + "  " +   String.format("%.4f", calc.C70)) );
        onPanel.add(new JLabel( "<html>   Vapour velocity(V<sub>g</sub>) [m/s]: " + "  " +   String.format("%.4f", calc.C71)) );
        onPanel.add(new JLabel( "<html>   P<sub>g</sub> * V<sub>g</sub><sup>2</sup>: " + "  "  + String.format("%.4f", calc.C72)) );

        JPanel lonPanel = new JPanel(new GridLayout(5, 1, 0, 6));
        JLabel lonLabel = new JLabel( "Liquid outlet nozzle"  );
        lonLabel.setFont(bolded);
        lonPanel.add(lonLabel);
        lonPanel.add(new JLabel( "<html>   Area of liquid outlet nozzle [m<sup>2</sup>]: " + "  " + String.format("%.4f", calc.C76)) );
        lonPanel.add(new JLabel( "Liquid velocity in nozzle [m/s]:  " + String.format("%.4f", calc.C77)) );
        lonPanel.add(new JLabel(""));

        nsPanel.add(new JLabel(""));
        nsPanel.add(inPanel);
        nsPanel.add(onPanel);
        nsPanel.add(lonPanel);
        return nsPanel;
    }


    public void actionPerformed(ActionEvent e)
    {
        if (e.getSource().equals(calcButton))
        {
            try
            {
                double C2 = Double.parseDouble(inC2.getText());
                double C3 = Double.parseDouble(inC3.getText());
                double C4 = Double.parseDouble(inC4.getText());
                double C5 = Double.parseDouble(inC5.getText());
                double C6 = Double.parseDouble(inC6.getText());
                double C7 = Double.parseDouble(inC7.getText());
                double C9 = Double.parseDouble(inC9.getText());
                double C10 = Double.parseDouble(inC10.getText());
                double C13 = Double.parseDouble(inC13.getText());
                double C14 = Double.parseDouble(inC14.getText());
                double C15 = Double.parseDouble(inC15.getText());
                    
                double C16 = Double.parseDouble(inC16.getText());
                double D16 = Double.parseDouble(inD16.getText());
                double E16 = Double.parseDouble(inE16.getText());
                    
                double C17 = Double.parseDouble(inC17.getText());
                double D17 = Double.parseDouble(inD17.getText());
                double E17 = Double.parseDouble(inE17.getText());
                    
                double C18 = Double.parseDouble(inC18.getText());
                double D18 = Double.parseDouble(inD18.getText());
                double E18 = Double.parseDouble(inE18.getText());
                    
                double C19 = Double.parseDouble(inC19.getText());
                double D19 = Double.parseDouble(inD19.getText());
                double E19 = Double.parseDouble(inE19.getText());
                    
                double C20 = Double.parseDouble(inC20.getText());  

               // mainTab.addTab("Result Set " + i, calculationsTab(30000,50,10,18.8,825.6,1003,2450,28,609.6,25.4,3048,88.9,2794,66.64,88.9,60.3, 60.3 ,1473,1727, 736 ,127 ,66.64,42.82, 42.82));
                mainTab.addTab("Result Set " + i, calculationsTab(C2, C3, C4,C5,  C6,   C7,  C9, C10,C13, C14,  C15, C16, D16, E16,  C17, C18,  C19, C20, D17, D18,  D19, E17, E18,E19));
                i++;
            }
            catch (NumberFormatException f)
            {
                JOptionPane.showMessageDialog(mainWindow, "One of the input boxes does not contain a valid number.");
            }
        }
        if (e.getSource().equals(table2_9))
        {
            JFrame table29Frame = new JFrame("Table 2.9");
            table29Frame.setSize(450, 255);
            table29Frame.setResizable(false);
            table29Frame.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
            La2_9.setIcon(Im2_9);
            table29Frame.add(La2_9);
            table29Frame.setVisible(true);
        }
        if (e.getSource().equals(compTable))
        {
            JFrame compTableFrame = new JFrame("Compressability Table");
            compTableFrame.setSize(525, 719);
            compTableFrame.setResizable(false);
            compTableFrame.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
            LaComp.setIcon(Imcomp);
            compTableFrame.add(LaComp);
            compTableFrame.setVisible(true);
        }
    }

    

    public static void main(String [] args)
    {
        new SeparatorSizing2021();
    }
}
