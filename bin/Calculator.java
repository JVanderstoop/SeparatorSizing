package bin; 

public class Calculator {
/**
 * some global variables for use in calculations 
 */
private static double   pi = Math.PI;

private static double C26 = 101.325;

private static double E27 = 288.15;

public static double    E2, E3, E4, E5, E9, E10, C35, C36, C38, C39, C40, C41,
                            C43, C44, C45, C46, C47, C48, C49, C52, C53, C54, 
                                C57, C58, C59, C64, C65, C66, C67, C70, C71, 
                                    C72, C76, C77;


    public Calculator(double C2, double  C3, double  C4, double  C5, double  C6, double  C7, double  C9, double  C10,
                        double C13, double  C14, double  C15, double  C16, double  D16, double  E16, double  C17, 
                            double  C18, double  C19, double  C20, double  D17, double  D18, double  D19, 
                                double  E17, double  E18, double  E19)
    {
            E2 =   C2 / (24*60*60);
            E3 =    C3 / (24 *60); 
            E4 =   C4 / (24*60);
            E5 =   (  C5 /28.965); 
            E9 =   C9 + C26;
            E10 =  (  C10 + 273.15);
            C35 =  (  C13 - (  2* C14  ));
            C36 =  (  0.25* pi * Math.pow( (C35/ 1000), 2));
            C38 =  (  (C2/23.6) *C5);
            C39 =  (  C3 * C6);
            C40 =  (  C4 * C7);
            C41 =  (  (C39 + C40) / ( C3 + C4));
            C43 =  compressability( E5, C26, E27, 1);
            C44 =  compressability( E5, E9, E10, 2);
            C45 =  (  (C5 * E9) / (8.3145 * E10 * C44));
            C46 =   C38 / C45;
            C47 =  (  0.116152 + 0.00000226 * E9);
            C48 =  (  C47 * Math.pow( ( ( C6-C45)/C45), 0.5));
            C49 =   (E2 * (C26/E9) * (E10/E27) * (C44 / C43 )) / C36 ;
            C52 =   300;
            C53 =   ((C20 - ( D18 + 0.5*C18 + C52   ))/ 1000 )* C36;
            C54 =   C53 /E3;
            C57 =   300;
            C58 =    ((( D18 - (0.5 * C18)) - (D19 + (0.5 * C19) + C57))/1000) * C36;
            C59 =   C58 / E4 ;
            C64 =  (  (C38 + C39 + C40) / (C3 + C4 + C46));
            C65 =  (  0.25 * pi * Math.pow( (E17/1000),  2));
            C66 =   (C3 + C4+ C46) / (24*60*60) / C65;
            C67 =  (  C64 * Math.pow (C66 , 2));
            C70 =  (  0.25 * pi * Math.pow((E16/1000), 2));
            C71 =   C46 / (24*60*60) / C70;
            C72 =  (  C45 * Math.pow(C71,  2));
            C76 =  (  0.25 * pi * Math.pow((E19/1000),  2));
            C77 =   ( C3 + C4 ) / (24 * 60 * 60 ) / C76 ; 
        }
    

        public double compressability( double I5, double I6, double I7, int z) 
        {
            double I10 = 8.3145;
            double I11 = 0.08; 
            double e = Math.E;  
            double I14 = 269.5454 * Math.pow(I5, 0.5783);
            double I15 = (-50.1578 * Math.pow(e, (I5 * 1.53848))) + (4773.4124 * Math.pow(e,  (I5 * -0.0061679)));
            double I16 = I7 / I14;
            double I18 = 0.45724 * Math.pow( I10, 2) * Math.pow(I14, 2) / I15; 
            double I19 =  0.0778* I10 * I14 / I15; 
            double I20 = Math.pow (  1+ (0.37464 + 1.54226 * I11 - 0.26992 * Math.pow( I11, 2) ) * ( 1 - Math.pow(I16, 0.5)) , 2);
            double I21 = I18* I20* I6 / ( Math.pow(I10, 2) * Math.pow (I7, 2) ) ; 
            double I22 = I19 * I6 / (I10 * I7);
                        
            double ztable[][] = new double[11][3];  // [i] = row , [j] = col 
            for (int i=0; i <11; i++)
            {
                for (int j=0; j<3; j++)
                {
                    if ( i==0 && j==0)
                    {   ztable[0][0] = 1.100000;   }
                    else if ( j ==0 )
                    {
                        ztable[i][j] = ztable[i-1][0] - ( ztable[i-1][1] / ztable[i-1][2] ) ; 
                    }
                    else if( j ==1)
                    {
                        ztable[i][j] =  Math.pow( ztable[i][0] , 3) - (1- I22) * Math.pow( ztable[i][0] , 2) + (I21 - 3* Math.pow(I22, 2) - 2* I22) * ztable[i][0] - (I21 * I22 - Math.pow(I22, 2) - Math.pow(I22, 3)); 
                    }
                    else if( j ==2)
                    {
                        ztable[i][j] = 3 * Math.pow( ztable[i][0] , 2) - 2 *(1-I22) * ztable[i][0] + (I21 - 3 * Math.pow( I22 , 2) - 2* I22) ; 
                    }
                }
            }	
                   
            double smallestZ =1.1; 
            for (int i =0; i < 11; i++)
            {
                if (ztable[i][0] < smallestZ)
                {	smallestZ = ztable[i][0];  }
            }
            return smallestZ;
        }

        
}
